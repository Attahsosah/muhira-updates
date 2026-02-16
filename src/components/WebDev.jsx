
import React from 'react'

function WebDev() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-5  bg-[url('https://i.ibb.co/tJJGx8m/pexels-junior-teixeira-1064069-2047905.jpg')] bg-cover bg-center bg-no-repeat">

        <h1 className="text-5xl font-bold mb-4">Professional Website Development</h1>
        <p className="text-lg max-w-2xl">
          Elevate your business with a custom, high-performance website tailored to your needs.
        </p>
        <a href="#contact" className="mt-6 px-6 py-3 bg-white text-indigo-600 rounded-full font-semibold hover:bg-gray-200">
          Get a Free Quote
        </a>
      </section>

      {/* Services Section */}
      {/* change */}
      {/* change */}
      <section className="py-20 px-5">
        <h2 className="text-4xl font-bold text-center mb-10">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Custom Website Design", desc: "Beautiful, responsive, and user-friendly designs to help your company stand out." },
            { title: "E-Commerce Solutions", desc: "Secure and scalable online stores such as this one." },
            { title: "SEO Optimization", desc: "Improve your visibility on search engines." },
          ].map((service, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-xl text-center shadow-lg">
              <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
              <p>{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-800 py-20 px-5">
        <h2 className="text-4xl font-bold text-center mb-10">What Our Clients Say</h2>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg italic">A great  development team! They delivered a stunning website that exceeded our expectations and built a site in 10 days.</p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 mb px-5 text-center">
        <h2 className="text-4xl font-bold mb-6">Lets Build Something Great</h2>
        <p className="mb-6">Contact us today to start your project!</p>
        <a href="https://wa.me/25769571109" className="px-6 py-3 bg-indigo-500 rounded-full text-white font-semibold hover:bg-indigo-600">
          Contact Us
        </a>
      </section>
    </div>
  )
}

export default WebDev