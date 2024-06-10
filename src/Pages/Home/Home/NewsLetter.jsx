

const NewsLetter = () => {
    return (
        <div>
         <div className="hero min-h-screen bg-base-200 relative my-10 mt-20" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'}}>
  <div className="absolute inset-0 bg-black bg-opacity-60"></div>
  <div className="hero-content ">
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <h3 className="text_3xl font-semibold text-center mt-8">Subscribe to newsletter</h3>
      <form className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" className="input input-bordered" required />
        </div>

        <div className="form-control mt-6">
          <button className="btn btn-primary">Subscribe</button>
        </div>
      </form>
    </div>
  </div>
</div>

        </div>
    );
};

export default NewsLetter;