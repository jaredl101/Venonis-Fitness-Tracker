


 isEqual = function (value, other) {
  // Code will go here...
};
const { bodyweight, user } = this.props;
let tempArray = []
if (this.props.bodyweight.length !== 0) {

  for (let i = 0; i < bodyweight.length; i++) {
    tempArray.push({ argument: moment(bodyweight[i].date).format("MMMM Do YYYY"), value: bodyweight[i].user_bodyweight + ' lbs' })
  }
  let newArray = [];
  //{ argument: 1, value: 140 }
  for (let i = 0; i < tempArray.length; i++) {
    let obj = tempArray[i]
    for (let prop in obj) {
      if (obj[prop] === obj) {

      }

    }
  }
}