import { motion } from 'framer-motion';
import { Shield, Target, Users } from 'lucide-react';

const AboutUs = () => {
  const values = [
    {
      icon: <Target className="w-8 h-8 text-accent" />,
      title: "Our Vision",
      desc: "To be the global leader in sustainable energy and environmental conservation solutions."
    },
    {
      icon: <Shield className="w-8 h-8 text-accent" />,
      title: "Our Mission",
      desc: "Providing high-quality solar products and environmental services that exceed client expectations."
    },
    {
      icon: <Users className="w-8 h-8 text-accent" />,
      title: "Our Team",
      desc: "A dedicated team of experts staying ahead of market trends to deliver excellence."
    }
  ];

  return (
    <section id="about" className="bg-white">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl -z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Sustainability" 
              className="rounded-2xl shadow-2xl relative z-10"
            />
            <div className="absolute -bottom-6 -right-6 bg-primary p-8 rounded-xl shadow-xl z-20 text-white hidden md:block">
              <span className="text-4xl font-bold block">150+</span>
              <span className="text-accent text-sm uppercase tracking-widest font-semibold">Projects Completed</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h4 className="text-accent font-bold uppercase tracking-widest mb-2 text-sm">Who We Are</h4>
            <h2 className="text-4xl font-bold text-primary mb-6 leading-tight">Driving Environmental Innovation Since 2018</h2>
            <p className="text-text-muted mb-6 leading-relaxed">
              We, Eagle Envitech, based in Palayamkottai, Tirunelveli, Tamil Nadu, are a top player in the solar energy systems. Our experienced team is well versed with the latest trends in the market. This enables us in providing the best quality products to our clients.
            </p>
            <p className="text-text-muted mb-6 leading-relaxed">
              Our superior quality products and courteous team have helped us in garnering an ever increasing client base. We also provide services such as reparation, installation, reconditioning, replacement and AMC for the products we offer. Our team is very cooperative while dealing with our clients.
            </p>
            <p className="text-text-muted mb-8 leading-relaxed">
              We also ensure that all the products are delivered within the stipulated time frame. Give us an opportunity to serve you.
            </p>
            <button className="btn btn-outline border-primary text-primary hover:bg-primary hover:text-white border-2">
              Learn More About Us
            </button>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {values.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-10 rounded-2xl border border-gray-100 bg-bg-light hover:shadow-xl transition-all duration-300 group"
            >
              <div className="mb-6 p-4 bg-white rounded-xl inline-block shadow-sm group-hover:scale-110 transition-transform">
                {v.icon}
              </div>
              <h3 className="text-xl font-bold text-primary mb-4">{v.title}</h3>
              <p className="text-text-muted">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
