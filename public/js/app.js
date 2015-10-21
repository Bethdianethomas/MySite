var BlogList = React.createClass({
    render: function() {
      
      var blogData = this.props.data.map(function(item){
        return <li> {blog.title} </li>
      });

        return (
        <div>
          <h1> Header </h1>
            <ul>
              {blogData}
            </ul>
        </div>
          );
    }
});

var BlogBox = React.createClass({

    getInitialState: function(){
      return {data: []};
    },

    loadTweetsFromServer: function() {
      var handle="BethDianeThomas"
      $.ajax({
        url: this.props.url + handle,
        dataType: 'json',
        cache: false,
        success: function(data) {
          console.log("inside success")
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.log("broken url is " + this.props.url)
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
  },

  componentDidMount: function(){
    this.loadTweetsFromServer();
  },

  

    render: function() {
        return (
        <div>
            <ul>
              <TweetList data={this.state.data}/>
            </ul>
        </div>
          );
    }
});

React.render(<TweetBox url="/api/handle/"/>, document.body);