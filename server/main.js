import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import { Employees } from '../imports/collections/employees';
import { image, helpers } from 'faker';

Meteor.startup(() => {
  // code to run on server at startup

  //Great place to generate some data

  //Check to see if data exists in the collection
  //See if the collection has any records
  const numberRecords = Employees.find({}).count();
  console.log(numberRecords);
  if (!numberRecords) {
    //Generate some data
    _.times(5000, () => {
      const { name, email, phone } = helpers.createCard();

      Employees.insert({
        name: name,
        email: email,
        phone: phone,
        avatar: image.avatar()
      });
    });
  }

  Meteor.publish('employees', function(per_page){
    return Employees.find({}, { limit: per_page });
  });
});
