const users = [];
const imagesAlreadyDisplayed = [];

function userJoin(id, username){
    const user = {
        id,
        username,
        correctAnswers : 0
    };

    users.push(user);

    return user;
}

//Get current user
function getCurrentUser(id){
    return users.find(user => user.id ===id);

}

//when user leave the room
function userLeave(id){
    const index = users.findIndex(user => user.id === id);

    if(index !== - 1){
        return users.splice(index,1)[0];
    }
}

//get userList
function getUserList(){
    return users;
}

function formatMessage(username, text){
    return{
        username,
        text
    }
}

let addImage = (image) => {
    imagesAlreadyDisplayed.push(image);
}

let getImagesAlreadyDisplayed = () => {
    return imagesAlreadyDisplayed;
 }

module.exports = {
    userJoin,
    getCurrentUser,
    getUserList,
    userLeave,
    formatMessage,
    addImage,
    getImagesAlreadyDisplayed,
};