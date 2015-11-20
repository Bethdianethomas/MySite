var BlogForm = React.createClass({
    handleSubmit: function(e){
      e.preventDefault();

      var title = React.findDOMNode(this.refs.title).value.trim();
      var body = React.findDOMNode(this.refs.body).value.trim();

      if(!title){
        return;
      }

      var data = ({title: title, body: body});
      console.log(data, "about to ajax!");
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        data: data,
        type: 'POST',
          success: function(response){
            console.log("inside success", data, response)
            document.location='/blog'
          }.bind(this),
          error: function(xhr, status, err) {
            console.log("not posting data")
            console.error(this.props.url, status, err.toString());
        }.bind(this)
      })
    },

    render: function() {
        return (
        <div>
          <form id="addBlog">
            <legend id= "legend">Add a blog entry</legend>

            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" ref="title" className="form-control" id="title" placeholder="What would you like to title your blog entry?"/>
            </div>

            <div className="form-group">
                <label htmlFor="body">Body</label>
                <textarea type="text" ref="body" className="form-control" id="body" placeholder="Write your thoughts!" rows="5"/>
            </div>

            <button onClick={this.handleSubmit} type="submit" className="btn btn-primary btn-lg btn-block">Submit</button>
        </form>
        </div>
          );
    }
});


React.render(<BlogForm url="/api/blogs"/>, document.getElementById('blogAdded'));
