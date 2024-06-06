

const Banner = () => {
    return (
        <div>
            <div className="carousel w-full h-[800px] ">
  <div id="slide1" className="carousel-item relative w-full">
    <img src="https://images.unsplash.com/photo-1605462979380-48f1ea3b3ff1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="w-full" />
    <div className="absolute flex justify-end gap-4 transform -translate-y-1/2 left-5 right-5 bottom-0">
      <a href="#slide4" className="btn btn-circle">❮</a> 
      <a href="#slide2" className="btn btn-circle">❯</a>
    </div>
    <div className="absolute flex items-center h-full  left-0 top-0 bottom-0  text-white bg-gradient-to-r from-[#151515] to-[rgba(21,21,21,0)]">
    <div className="space-y-6 ml-10 ">
    <h5 className="font-bold text-6xl">Reach for your <br />
    <span className="text-[#5ce1e6]">PEAK</span></h5>
     <p>Come pay us a visit to fix your car in loiest Price</p>
     <div className="">
        <button className="btn mr-4">Discove More</button>
        <button className="btn">Lested Project</button>
     </div>
    </div>
    </div>
  </div> 
  <div id="slide2" className="carousel-item relative w-full">
    <img src="https://images.unsplash.com/photo-1616587226157-48e49175ee20?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="w-full" />
    <div className="absolute flex justify-end gap-4 transform -translate-y-1/2 left-5 right-5 bottom-0">
      <a href="#slide1" className="btn btn-circle">❮</a> 
      <a href="#slide3" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide3" className="carousel-item relative w-full">
    <img src="https://images.unsplash.com/photo-1616531770192-6eaea74c2456?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="w-full" />
    <div className="absolute flex justify-end gap-4 transform -translate-y-1/2 left-5 right-5 bottom-0">
      <a href="#slide2" className="btn btn-circle">❮</a> 
      <a href="#slide4" className="btn btn-circle">❯</a>
    </div>
  </div> 
</div>
        </div>
    );
};

export default Banner;