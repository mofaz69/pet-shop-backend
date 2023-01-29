const fs = require("fs");
const path = require("path");
const petDal = require("../dal/pet-dal");
const userDal = require("../dal/user-dal");

function validatePetData(pet) {
  if (pet.id) {
    return "Cannot set pet id";
  }

  if (
    !pet.name ||
    !pet.type ||
    !pet.color ||
    !pet.height ||
    !pet.weight ||
    !pet.bio ||
    pet.hypoallergenic === undefined ||
    !pet.dietaryRestrictions ||
    !pet.breed ||
    !pet.imageUrl
  ) {
    return "pet must have:name, type, color, height, weight, bio, hypoallergenic, dietaryRestrictions, breed";
  }
}

async function createNewPet(req, res) {
  try {
    const pet = req.body;

    fs.renameSync(
      req.file.path, // temp location
      path.join(process.cwd(), "static", "images", req.file.originalname) // final location
    );
    const imageUrl = `http://localhost:3001/static/images/${req.file.originalname}`;

    const validationResult = validatePetData({ ...pet, imageUrl });
    if (validationResult) {
      return res.status(400).json({ message: validationResult });
    }
    const hypoallergenic = pet.hypoallergenic === "Yes";
    const newPet = await petDal.createPet({ ...pet, hypoallergenic, imageUrl });
    res.json(newPet);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
}

function updatePet(req, res) {
  let imageUrl = req.body.imageUrl;
  if (req.file) {
    fs.renameSync(
      req.file.path, // temp location
      path.join(process.cwd(), "static", "images", req.file.originalname) // final location
    );
    imageUrl = `http://localhost:3001/static/images/${req.file.originalname}`;
  }

  try {
    const petId = req.params.petId;
    const petData = {
      ...req.body,
      hypoallergenic: req.body.hypoallergenic === "Yes",
      imageUrl,
    };

    const validationResult = validatePetData(petData);
    if (validationResult) {
      return res.status(400).send(validationResult);
    }

    petDal.updatePet(petId, petData);

    res.json(petData);
  } catch (err) {
    res.status(500).send(err);
  }
}

function findPetById(req, res) {
  try {
    const petId = req.params.petId;
    const pet = [].find((pet) => pet.id === petId);
    res.json(pet);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function getPetsByQuery(req, res) {
  try {
    const rawQuery = req.body;

    console.log(rawQuery);

    const query = {};

    if (rawQuery.name) {
      query.name = { $regex: rawQuery.name, $options: "i" };
    }
    if (rawQuery.type) {
      query.type = { $regex: rawQuery.type, $options: "i" };
    }
    if (rawQuery.minHeight) {
      query.height = { $gte: rawQuery.minHeight };
    }

    if (rawQuery.maxHeight) {
      query.height = {
        ...(query.height ? query.height : {}),
        $lte: rawQuery.maxHeight,
      };
    }

    if (rawQuery.minWeight) {
      query.weight = { $gte: rawQuery.minWeight };
    }

    if (rawQuery.maxWeight) {
      query.weight = {
        ...(query.weight ? query.weight : {}),
        $lte: rawQuery.maxHeight,
      };
    }

    if (rawQuery.adoptionStatus && rawQuery.adoptionStatus !== "all") {
      if (rawQuery.adoptionStatus === "available") {
        query.owner = { $eq: "" };
      } else if (rawQuery.adoptionStatus === "foster") {
        query.fosterer = { $ne: "" };
      } else {
        // adopted status - owner equals userId that owns the pet
        query.owner = { $ne: "" };
      }
    }

    const pets = await petDal.searchPetByQuery(query);
    res.json(pets);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function getAllPets(req, res) {
  try {
    const pets = await petDal.getAllPets();
    res.json(pets);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function adoptPet(req, res) {
  try {
    const petId = req.params.petId;
    const ownerId = req.user._id;
    await petDal.adoptPet(petId, ownerId);
    res.json({ message: "adopted successfully!" });
  } catch (err) {
    res.status(500).send(err);
  }
}
async function fosterPet(req, res) {
  try {
    const petId = req.params.petId;
    const ownerId = req.user._id;
    await petDal.fosterPet(petId, ownerId);
    res.json({ message: "fostered successfully!" });
  } catch (err) {
    res.status(500).send(err);
  }
}
async function returnPet(req, res) {
  try {
    const petId = req.params.petId;
    await petDal.returnPet(petId);
    res.json({ message: "returned pet successfully!" });
  } catch (err) {
    res.status(500).send(err);
  }
}

async function returnPetFromFoster(req, res) {
  try {
    const petId = req.params.petId;
    await petDal.returnPetFromFoster(petId);
    res.json({ message: "returned pet successfully!" });
  } catch (err) {
    res.status(500).send(err);
  }
}

async function savePetToUser(req, res) {
  try {
    const petId = req.params.petId;
    const userId = req.user._id;
    await userDal.savePetToUser(petId, userId);
    res.json({ message: "Pet saved successfully!" });
  } catch (err) {
    res.status(500).send(err);
  }
}

async function removePetFromUser(req, res) {
  try {
    const petId = req.params.petId;
    const userId = req.user._id;
    await userDal.removePetFromUser(petId, userId);
    res.json({ message: "Pet removed successfully!" });
  } catch (err) {
    res.status(500).send(err);
  }
}

async function findPetByUserId(req, res) {
  try {
    const userId = req.params.userId;
    const pets = await petDal.getPetByUserId(userId);
    res.json(pets);
  } catch (err) {
    res.status(500).send(err);
  }
}

module.exports = {
  createNewPet,
  updatePet,
  findPetById,
  getAllPets,
  adoptPet,
  fosterPet,
  savePetToUser,
  returnPet,
  removePetFromUser,
  findPetByUserId,
  getPetsByQuery,
  returnPetFromFoster,
};
