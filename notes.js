const { default: chalk } = require('chalk');
const fs = require('fs');

const getNotes = ()=>{
    const notes = loadNotes();

    if(notes.length===0){
        console.log(chalk.inverse.red('No notes added'));
    }
    else{
        console.log(chalk.yellow('Your notes:'));
        notes.forEach((note)=>console.log(note.title));
    }
}

const addNote = (title, body)=>{
    const notes = loadNotes();
    const duplicateNote = notes.find(note=>note.title===title);

    debugger;

    if(!duplicateNote){
        notes.push({
            title,
            body
        });
        saveNotes(notes);
        console.log(chalk.green('1 note added successfully!'));
    }
    else{
        console.log(chalk.red('Note title taken!'));
    }
    
}

const deleteNote = (title)=>{
    const notes = loadNotes();
    const notesToKeep = notes.filter((note)=>note.title !== title);

    if(notesToKeep.length===notes.length){
        console.log(chalk.red('Nothing to remove'));
    }
    else{
        saveNotes(notesToKeep);
        console.log(chalk.green('1 note deleted succesfully'
        ));
    }
    
}

const readNote = (title)=>{
    const notes = loadNotes();
    const findNote = notes.find(note=>note.title===title);

    if(findNote){
        console.log('Title -', chalk.blue.bold(findNote.title),'\nDescription - ', chalk.green(findNote.body));
    }
    else{
        console.log(chalk.red('No note found'));
    }
}

const saveNotes = (notes)=>{
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json',dataJSON);
}

const loadNotes = ()=>{
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);   
    } catch (error) {
        return []; 
    }  
}

module.exports = {
    getNotes,
    addNote,
    deleteNote,
    readNote
}