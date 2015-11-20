var BlogComment = React.createClass({
      handleCommentSubmit: function(e){
        e.preventDefault();
        console.log("handleCommentSubmit triggered")

        var comment = this.refs.comment.getDOMNode().value;
        console.log("COMMENT IS ", comment)

          if(!comment){
          return;
         }

        var blogId = this.props.blogId;
        console.log("BLOG ID IS: ", blogId)

        var data = ({comment: comment});

        $.ajax({
          url: '/api/blogs/'+blogId+'/comment',
          dataType: 'json',
          data: data,
          type: 'POST',
            success: function(data){
              console.log("comment success", data)
              document.location='/blog'
              }.bind(this),
            error: function(xhr, status, err) {
              console.log("not posting comment")
              console.error(status, err.toString());
          }.bind(this)
        })
        this.refs.comment.getDOMNode().value= ''
      },

      render: function(){
        return(
            <div className=" container-fluid col-md-10 col-sm-6 col-xs-6" id="addComment">
              <div className="form-group"> 
                <form>
                <label htmlFor="comment">Comment</label>
                  <input type="text" ref="comment" className="form-control"id="comment" maxlength="200" placeholder="Add your comments for this post"/>
                    <button onClick={this.handleCommentSubmit}  type="submit" className="btn btn-primary" id="commentSubmit">Submit</button>  
                </form>
              </div>
            </div>
          );
      }

});

var BlogList = React.createClass({
    render: function() {
      
      var blogData = this.props.data.map(function(blog){
        if(blog.comments.length > 0){
          var comments = blog.comments.map(function(c){
            return ( <p> {c.body} </p>
            )
          })
        } else {
          var comments = "no comments yet..."
        }

        return (
        <div>
          <div className="container" id="blogTable">
            <div className="col-md-12">
              <h1 id="blogTitle">{blog.title}</h1>
                <p><span className="badge">Posted: {blog.date}</span></p>
                <p>{blog.body}</p>
                <p>{comments}</p>
            </div>
            <div>
              <BlogComment blogId={blog._id}  />
            </div>
        </div>         
      </div>
      )
    }).reverse();
        
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



React.render(<BlogBox url="/api/blogs"/>, document.getElementById('blogList'));