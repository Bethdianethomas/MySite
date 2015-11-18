var BlogList = React.createClass({
    render: function() {
      
      var blogData = this.props.data.map(function(blog){
        return (
        <div>
          <div className="container-fluid" id="vendorTable">
            <div className="media col-md-3 col-sm-4 col-xs-6">
              <a className="thumbnail" id="farmStand">
                <img src={blog.img}/>
              </a>
            </div>
          </div>
        </div>
      )
    });
        

        return (
        <div>
          <h1> </h1>
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

    loadBlogsFromServer: function() {
      $.ajax({
        url: this.props.url,
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
    this.loadBlogsFromServer();
  },

  

    render: function() {
        return (
        <div>
            <ul>
              <BlogList data={this.state.data}/>
            </ul>
        </div>
          );
    }
});

// var BlogList = React.createClass({
//     render: function() {
      
//       var blogData = this.props.data.map(function(blog){
//         return (<li><p> {blog.title} </p>
//                  <p>{blog.body} </p></li>
//                 );
//       });

//         return (
//         <div>
//           <h1> </h1>
//             <ul>
//               {blogData}
//             </ul>
//         </div>
//           );
//     }
// });



React.render(<BlogBox url="/api/blogs"/>, document.getElementById('blogList'));