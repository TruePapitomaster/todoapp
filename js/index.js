var todoApp = angular.module("todoapp", ["firebase"]);

function TodoCtrl($scope, angularFire) {
  // Set up Firebase url
  var ref = new Firebase("https://angular-todos.firebaseio.com");
  // Bind todos to AngularFire
  angularFire(ref, $scope, "todos");  
  
  $scope.todos = [];

  $scope.addTodo = function() {
    var newTodo = {
      text: $scope.todoText,
      done: false
    };
    $scope.todos.push(newTodo);
    $scope.todoText = '';
  };
  
  $scope.removeTodo = function(index) {
    $scope.todos.splice(index, 1);
  };
  
  $scope.move = function(index, direction) {
    // Handle moving up.
    if (direction === 'up') {
      if (index === 0) {
        return;
      }
      index = index - 1;
    }
    // Handle moving down.
    if (direction === 'down') {
      if (index === $scope.todos.length) {
        return;
      }
    }    
    endIndex = index + 2;
    var todo = $scope.todos[index];
    $scope.todos.splice(endIndex, 0, todo);
    $scope.todos.splice(index, 1);
  };

}