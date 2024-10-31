#!/usr/bin/env node
import fs from "node:fs";
import { title } from "node:process";
// Thirdparty module
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
const argv = yargs(hideBin(process.argv)).argv;
// *********

// Array to store all notes from user
let allNotes = [];

function addNote() {
  // A note object to be stored in usernotes
  const note = {
    noteTitle: argv.title,
    noteContent: argv.content,
  };
  // Use the fs.readfile() method to check if the user already has stored notes
  fs.readFile("userNotes.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      //   If error occurs, then we want to create the user note
      allNotes.push(note);
      fs.writeFileSync("userNotes.json", JSON.stringify(allNotes), "utf-8");
      return;
    }
    // If no error, we want to update the user note
    let savedNotes = JSON.parse(data);
    savedNotes.push(note);
    fs.writeFileSync("userNotes.json", JSON.stringify(savedNotes), "utf-8");
  });

  return "Note added successfully";
}

// console.log(addNote());

// Function to list out all notes
function listAllNotes() {
  const allUserNotes = fs.readFileSync("userNotes.json", "utf-8");
  return JSON.parse(allUserNotes);
}

// console.log(listAllNotes());

// Function to delete note

function deleteNotesByTitle(params) {
  // Get all the saved notes
  const savedNotes = fs.readFileSync("userNotes.json", "utf-8");
  //   Filter out the notes with the provided title
  const updatedNotes = JSON.parse(savedNotes).filter(
    (item) => item.noteTitle !== argv.title
  );
  //   Update the userNotes with the notes left
  fs.writeFileSync("userNotes.json", JSON.stringify(updatedNotes));

  return "Note deleted successfully";
}

// console.log(deleteNotesByTitle());

function readOneFile() {
  let singleNote = fs.readFileSync("userNotes.json", "utf-8");
  let seletedNoteByTitle = JSON.parse(singleNote).find(
    (item) => item.noteTitle === argv.title
  );

  return seletedNoteByTitle;
}
console.log(readOneFile());

switch (argv.command) {
  case "add note":
    console.log(addNote());

    break;
  case "list note":
    console.log(listAllNotes());

    break;
  case "delete note":
    console.log(deleteNotesByTitle());

    break;
  case "read note":
    console.log(readOneFile());

    break;

  default:
    console.log("No command not found");
    break;
}
