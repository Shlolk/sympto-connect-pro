const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-primary to-secondary text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">SymptoMap Pro</h1>
                <p className="text-sm text-white/80">Healthcare Made Simple</p>
              </div>
            </div>
            <p className="text-white/90 text-sm leading-relaxed">
              Connecting patients with the right healthcare professionals through smart symptom analysis and seamless appointment booking.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-white/90">
              <li><a href="#" className="hover:text-white smooth-transition">Symptom Checker</a></li>
              <li><a href="#" className="hover:text-white smooth-transition">Doctor Finder</a></li>
              <li><a href="#" className="hover:text-white smooth-transition">Appointment Booking</a></li>
              <li><a href="#" className="hover:text-white smooth-transition">Health Records</a></li>
              <li><a href="#" className="hover:text-white smooth-transition">Telemedicine</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-white/90">
              <li><a href="#" className="hover:text-white smooth-transition">Help Center</a></li>
              <li><a href="#" className="hover:text-white smooth-transition">Contact Us</a></li>
              <li><a href="#" className="hover:text-white smooth-transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white smooth-transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white smooth-transition">Medical Disclaimer</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <div className="space-y-3 text-sm text-white/90">
              <div className="flex items-center gap-2">
                <span>📞</span>
                <span>1-800-SYMPTOM</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✉️</span>
                <span>help@symptomap.com</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📍</span>
                <span>Available 24/7</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-white/80">
            © 2024 SymptoMap Pro. All rights reserved. Made with ❤️ for better healthcare.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <span className="text-sm text-white/80">Follow us:</span>
            <div className="flex gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 smooth-transition cursor-pointer">
                <span className="text-sm">f</span>
              </div>
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 smooth-transition cursor-pointer">
                <span className="text-sm">t</span>
              </div>
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 smooth-transition cursor-pointer">
                <span className="text-sm">in</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;