const { nanoid } = require("nanoid");
const notes = require("./notes");

const addNote = (request, h) =>{
    const {title, tags, body} = request.payload;
    const id = nanoid(16);
    const creatDate = new Date().toISOString();
    const updateDate = creatDate;

    const newNote ={
        title,
        tags,
        body,
        id,
        creatDate,
        updateDate
    };

    notes.push(newNote);
    const isSucces = notes.filter((note) => note.id === id).length > 0;

    // const response = h.response({    
    //     status: "success",
    //     message: "Catatan berhasil ditambahkan",
    //     data: {newNote}
    // });
    // response.code(201);
    // return response;
    if(isSucces){
        const response = h.response({
            status: "fail",
            message: "catatan berhasil ditambahkan ",
            data: {
                noteId: id,
            },
        });
        response.code(201);
        return response
    }

    const response = h.response({
        status: "fail",
        message: "catatan gagal ditambahkan ",
    });
    response.code(500);
    return response

};

const getNote = () => ({
    status: "success",
    data: {
        notes,
    },
});

const getNoteById = (request, h) => {
    const {id} = request.params;
    const note = notes.filter((n) => n.id === id)[0];
    if(note !== undefined){
        return {
            status: "success",
            data: {
                note,
            },
        };
    }
    const response = h.response({
        status: "fail",
        message: "Catatan tidak ditemukan",
    });
    response.code(404);
    return response;
};

const editNoteById = (request, h) => {
    const {id} = request.params;
    const {title, tags, body} = request.payload;
    const updateDate = new Date().toISOString();
    const index = notes.findIndex((note) => note.id === id);

    if(index !== -1){
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updateDate,
        };
        const response = h.response({
            status: "success",
            message: "Catatan berhasil diperbarui",
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: "fail",
        message: "Gagal memperbarui catatan. Id tidak ditemukan",
    });
    response.code(404);
    return response;

};

const deleteNoteById = (request, h) => {
    const {id} = request.params;
    const index = notes.findIndex((note) => note.id === id);

    if(index !== -1){
        notes.splice(index, 1);
        const response = h.response({
            status: "success",
            message: "catatan berhasil dihapus",

        });
        response.code = 200;
        return response;
    }

    const response = h.response({
        status: "fail",
        message: "Catatan gagal dihapus. Id tidak ditemukan",
    });
    response.code(404);
    return response;
}

module.exports = {addNote, getNote, getNoteById, editNoteById, deleteNoteById};