function Mission() {
  return (
    <div className="flex flex-col my-10 lg:my-20 mx-10">
        <h2 className="text-mm-text text-2xl sm:text-4xl">Mission</h2>
        <div className="flex lg:flex-row flex-col items-center">
            <p className="text-xl sm:text-3xl/relaxed text-center lg:pb-0 pb-10 font-light lg:pl-20 lg:pr-30">Our mission is to empower individuals to make healthier food choices by providing an intuitive and customizable meal planning tool. We strive to simplify the process of building nutritious meal plans, ensuring that users can maintain a balanced diet that fits their lifestyle and dietary needs.</p>
            <img className="lg:w-1/3 w-2/3" src="mission.png" alt="" />
        </div>
    </div>
  )
}

export default Mission
