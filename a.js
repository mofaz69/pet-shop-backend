// // [1, 2, 3].map((el) => console.log(el));

// const filtered = [1, 2, 2].filter((el) => el === 2);
// // console.log(filtered);

// const numbers = [1, 2, 3]
// const result = numbers.find((avi) => avi === 2);
// // console.log(result);

// const person1 = {
//   name: "avi",
//   age: 18,
// };

// const person2 = {
//   name: "b",
//   age: 20,
// };

// const arr = [person1, person2];

// for (const person of arr) {
//   person["age"] = person["age"] + 2;
// }

// console.log(arr);

const petId = "3";
const pets = [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }];
const petDemo = pets.find((pet) => petId === pet.id);
