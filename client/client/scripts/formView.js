var FormView = {
  counter: 0,

  $form: $('form'),

  initialize: function() {
    FormView.$form.on('submit', FormView.handleSubmit);
  },

  handleSubmit: function(event) {
    // Stop the browser from submitting the form
    event.preventDefault();
    

    FormView.counter++;
    while (Messages._data[FormView.counter]) {
      FormView.counter++;
    }

    var message = {
      objectId: FormView.counter,
      username: App.username,
      text: FormView.$form.find('#message').val(),
      roomname: Rooms.selected || 'lobby'
    };

    Parse.create(message, (data) => {
      _.extend(message, data);
      Messages.add(message, MessagesView.render);
    });
  },

  setStatus: function(active) {
    var status = active ? 'true' : null;
    FormView.$form.find('input[type=submit]').attr('disabled', status);
  }

};