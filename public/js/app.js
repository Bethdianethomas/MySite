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
                if(this.props.onPost){
                  this.props.onPost()
                }
              // document.location='/blog'
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
            <div className=" container-fluid col-md-12 commentsBox">
              <div className="form-group"> 
                <form>
                <label htmlFor="comment">Comment</label>
                  <input type="text" ref="comment" className="form-control"id="comment" maxLength="200" placeholder="Add your comments for this post"/>
                    <button onClick={this.handleCommentSubmit}  type="submit" className="btn btn-primary" id="commentSubmit">Submit</button>  
                </form>
              </div>
            </div>
          );
      }

});

var BlogList = React.createClass({
    render: function() {
      var self = this;

      var blogData = this.props.data.map(function(blog){
        if(blog.comments.length > 0){
          var comments = blog.comments.map(function(c){

            return ( <p> {c.body} </p>
            )
          })
        } else {
          var comments = ""
        }


        return (
          <div>
          <div className="container-fluid" id="blogTable">
            <div className="col-md-12">
              <h1 id="blogTitle">{blog.title}</h1>
              <hr />
                <p><span className="label label-warning">Posted: {blog.date.slice(0,10)}</span></p>
                <p>{blog.comments.email}</p>
                <p>{blog.body}</p>
                <p id="blogComments">Comments</p>
                <p>{comments}</p>

            </div>
            <div className="col-md-12 commentsBox">
            <hr />
              <BlogComment blogId={blog._id} onPost={self.props.newData}  />
            </div>
            </div>
          </div> 
      )
    }).reverse();
        
        return (
        <div className="commentsBox">
              {blogData}
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

        var self = this;
        var doRefresh = function(){
          self.loadBlogsFromServer()
        }

        return (
        <div>
            <ul>
              <BlogList data={this.state.data} newData={doRefresh}/>
            </ul>
        </div>
          );
    }
});



React.render(<BlogBox url="/api/blogs"/>, document.getElementById('blogList'));