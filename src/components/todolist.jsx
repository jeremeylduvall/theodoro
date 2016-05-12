var React = require('react');
var Todo = require('./todo');
var _ = require('lodash');

var TodoList = React.createClass( {
	getInitialState: function() {
		return {
			taskInput: null,
			incompleteTasks: [],
			completeTasks: []
		};
	},

	componentDidMount: function() {
		this.incompleteTaskHolder = [];
		this.completeTaskHolder = [];
	},

	buildNewTask: function( taskInput ) {
		return (
			{
				taskValue: taskInput,
				completed: false,
				editing: false,
				deleted: false
			}
		);
	},

	resetAddField: function() {
		this.setState( {
			taskInput: null
		} );
	},

	handleChange: function( e ) {
		this.setState( {
			taskInput: e.target.value
		} );
	},

	handleAdd: function () {
		if ( this.state.taskInput !== null ) {
			this.incompleteTaskHolder.push( this.buildNewTask( this.state.taskInput ) );
		} else {
			alert( 'You have to type something' );
		}

		this.setState( {
			incompleteTasks: this.incompleteTaskHolder
		} );

		this.resetAddField();
	},

	onDelete: function( i ) {
		// Flip the current task deleted field to true
		this.incompleteTaskHolder[i].deleted = true;

		// Set this.state.incompleteTasks
		this.setState( {
			incompleteTasks: this.incompleteTaskHolder
		} );
	},

	onEdit: function( i ) {
		// Flip the current task editing field to true
		this.incompleteTaskHolder[i].editing = true;

		// Set this.state.incompleteTasks
		this.setState( {
			incompleteTasks: this.incompleteTaskHolder
		} );
	},

	onSave: function( i ) {
		// Flip the current task editing field to true
		this.incompleteTaskHolder[i].editing = false;

		// Set this.state.incompleteTasks
		this.setState( {
			incompleteTasks: this.incompleteTaskHolder
		} );
	},

	onComplete: function( i ) {
		var currentTask;

		// Flip the current task complete field to true
		this.incompleteTaskHolder[i].completed = true;

		// Store the value of the completed task
		currentTask = this.incompleteTaskHolder[i];

		// Splice task from incompleteTaskHolder
		this.incompleteTaskHolder.splice( i, 1 );

		// Add completed todo to coompleteTaskHolder
		this.completeTaskHolder.push( currentTask );

		// Set this.state.incompleteTasks to remaining incomplete todos
		this.setState( {
			incompleteTasks: this.incompleteTaskHolder,
			completeTasks: this.completeTaskHolder
		} );
	},

	onUncheck: function( i ) {
		var currentTask;

		// Flip the current task complete field to true
		this.completeTaskHolder[i].completed = false;

		// Store the value of the completed task
		currentTask = this.completeTaskHolder[i];

		// Splice task from incompleteTaskHolder
		this.completeTaskHolder.splice( i, 1 );

		// Add completed todo to coompleteTaskHolder
		this.incompleteTaskHolder.push( currentTask );

		// Set this.state.incompleteTasks to remaining incomplete todos
		this.setState( {
			incompleteTasks: this.incompleteTaskHolder,
			completeTasks: this.completeTaskHolder
		} );
	},

	onEditTask: function( event ) {
		console.log( event );
	},

	render: function() {
		if ( this.state.incompleteTasks ) {
			var taskList = this.state.incompleteTasks.map( function( task, i ) {
				if ( task.deleted !== true ) {
					return (
						<Todo
							taskValue={ task.taskValue }
							key={ _.uniqueId() }
							editing={ task.editing }
							completed={ task.completed }
							onComplete={ this.onComplete.bind( this, i ) }
							onEdit={ this.onEdit.bind( this, i ) }
							onDelete={ this.onDelete.bind( this, i) }
							onSave={ this.onSave.bind( this, i ) }
							editTask={ this.onEditTask }
						/>
					);
				}
			}.bind( this ) );
		}

		if ( this.state.completeTasks ) {
			var completeTaskList = this.state.completeTasks.map( function( task, i ) {
				if ( task.deleted !== true ) {
					return (
						<Todo
							taskValue={ task.taskValue }
							key={ _.uniqueId() }
							editing={ task.editing }
							completed={ task.completed }
							onComplete={ this.onUncheck.bind( this, i ) }
							onEdit={ this.onEdit.bind( this, i ) }
							onDelete={ this.onDelete.bind( this, i) }
							onSave={ this.onSave.bind( this, i ) }
						/>
					);
				}
			}.bind( this ) );
		}

		return (
			<div>
				<h2 className="todolist">Todo List</h2>
				<div className="input-group">
  				<input type="text" className="form-control" value={ this.state.taskInput } aria-describedby="basic-addon1" onChange={ this.handleChange }></input>
					<span className="input-group-btn">
						<button className="btn btn-default" type="button" onClick={ this.handleAdd }>
							Add
						</button>
					</span>
				</div>
				<div className="row">
					<div className="completed col-md-6">
						<h4>Completed</h4>
						{ completeTaskList }
					</div>
					<div className="completed col-md-6">
						<h4>Incompleted</h4>
						{ taskList }
					</div>
				</div>
			</div>
		);
	}
} );

module.exports = TodoList;