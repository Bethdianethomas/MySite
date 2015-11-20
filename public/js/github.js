var Github = React.createClass({
	render: function() {
		var gitStuff = this.props.data.map(function(commits){
		return (
			<div className="col-md-4">
				<h3 id="repo"> Repo Name </h3>
				<p>{commits.repo}</p>
			</div>
			)
		});

	return(
		<div>
		{gitStuff}
		</div>
	);
   }
});



var GitBox = React.createClass({
	getInitialState: function(){
		return{data: []};
	},

	loadGitData: function(){
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			success: function(data){
				console.log(data),
				this.setState({ data:data })
			}.bind(this), 
			error: function(err){
				console.log('you done messed up boy')
			}.bind(this)
		})
	},
	componentDidMount: function(){
		this.loadGitData();
	},

	render: function(){
		return (
			<div>
				<Github data ={this.state.data}/>
			</div>
		);
	}
})


React.render(<GitBox url="/api/github/"/>, document.getElementById('githubData'));