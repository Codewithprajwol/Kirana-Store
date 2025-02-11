import React from 'react'

const Footer = () => {
  return (
    <footer class=" py-12 text-black bg-[#dadada] mx-auto">
  <div class="container flex sm:block px-4 items-center justify-center mx-auto">
    <div class="grid justify-center items-center grid-cols-2 lg:grid-cols-5 gap-8">

      <div class="col-span-1">
        <a href="/" class="text-lg font-semibold">
          Your Logo Here
        </a>
        <ul class="mt-4 space-y-2">
          <li><a href="#" class="hover:text-gray-300">Home</a></li>
          <li><a href="#" class="hover:text-gray-300">About Us</a></li>
          <li><a href="#" class="hover:text-gray-300">How to Order</a></li>
          <li><a href="#" class="hover:text-gray-300">Support</a></li>
        </ul>
      </div>

      <div class="col-span-1">
        <h6 class="font-semibold">Lists</h6>
        <ul class="mt-4 space-y-2">
          <li><a href="#" class="hover:text-gray-300">Create My List</a></li>
          <li><a href="#" class="hover:text-gray-300">How to use lists?</a></li>
          <li><a href="#" class="hover:text-gray-300">Recommended</a></li>
        </ul>
      </div>

      <div class="col-span-1">
        <h6 class="font-semibold">Download App</h6>
        <div class="mt-4 space-y-2">
          <a href="#"><img src="placeholder_google_play.png" alt="Google Play" class="w-32"/></a>
          <a href="#"><img src="placeholder_app_store.png" alt="App Store" class="w-32"/></a>
        </div>
      </div>

      <div class="col-span-1">
        <h6 class="font-semibold">Terms & Policies</h6>
        <ul class="mt-4 space-y-2">
          <li><a href="#" class="hover:text-gray-300">Terms of Service</a></li>
          <li><a href="#" class="hover:text-gray-300">Shipping Policy</a></li>
          <li><a href="#" class="hover:text-gray-300">Return Policy</a></li>
          <li><a href="#" class="hover:text-gray-300">Privacy Statement</a></li>
        </ul>
      </div>

      <div class="col-span-1">
        <h6 class="font-semibold">Stay in Touch</h6>
        <div class="mt-4 flex space-x-4">
          <a href="#" class="hover:opacity-75"><svg class="w-6 h-6 fill-current" viewBox="0 0 24 24"><path fill="currentColor" d="M9 8h-3v4h3v12h5v-12h3.698l.302-4h-4v-2.167c0-.955.833-1.833 2.167-1.833h1.833v-4h-3.6c-3.012 0-5.133 2.579-5.133 5.579v.421z"/></svg></a>
          <a href="#" class="hover:opacity-75"><svg class="w-6 h-6 fill-current" viewBox="0 0 24 24"><path fill="currentColor" d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.604.246 11.631.245 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l5.977 4-5.977 4z"/></svg></a>
          <a href="#" class="hover:opacity-75"><svg class="w-6 h-6 fill-current" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10c-2.757 0-5.257-1.123-7.189-2.939l-2.833 2.65c-.162.152-.376.229-.588.229-.153 0-.306-.047-.431-.146a.659.659 0 0 1-.192-.486c0-.225.088-.439.242-.594l2.661-2.795c-1.649-1.815-2.577-4.075-2.577-6.915 0-5.514 4.486-10 10-10zm-5.327 14.984l1.446-3.333c.304-.702 1.004-1.151 1.766-1.151h.099c.763 0 1.462.449 1.767 1.151l1.384 3.333h-6.462zm5.728-2.639l-1.805-4.357c-.181-.438-.612-.729-1.079-.729-.468 0-.898.291-1.079.729l-1.718 4.357h5.681z"/></svg></a>
          <a href="#" class="hover:opacity-75"><svg class="w-6 h-6 fill-current" viewBox="0 0 24 24"><path fill="currentColor" d="M17.882 3.346a4.797 4.797 0 0 0-3.508-.981 4.797 4.797 0 0 0-3.507.981 4.798 4.798 0 0 0-3.072 3.072 4.798 4.798 0 0 0-.981 3.507 4.798 4.798 0 0 0 .981 3.508 4.797 4.797 0 0 0 3.072 3.072 4.797 4.797 0 0 0 3.507.981 4.798 4.798 0 0 0 3.508-.981 4.797 4.797 0 0 0 3.072-3.072 4.797 4.797 0 0 0 .981-3.508 4.798 4.798 0 0 0-.981-3.507 4.797 4.797 0 0 0-3.072-3.072zm-1.405 1.19a3.305 3.305 0 0 1 2.398.668 3.306 3.306 0 0 1 .667 2.398 3.306 3.306 0 0 1-.667 2.398 3.305 3.305 0 0 1-2.398.667 3.306 3.306 0 0 1-2.398-.667 3.306 3.306 0 0 1-.667-2.398 3.306 3.306 0 0 1 .667-2.398 3.305 3.305 0 0 1 2.398-.668zm-3.977 3.02a4.098 4.098 0 1 1 0 8.197 4.098 4.098 0 0 1 0-8.197zm4.028 4.348a2.149 2.149 0 1 1 0-4.298 2.149 2.149 0 0 1 0 4.298z"/></svg></a>
        </div>

        <div class="mt-4">
          <img src="placeholder_payment_icons.png" alt="Payment Icons" class="h-8"/>
        </div>
      </div>

    </div>
  </div>
</footer>
  )
}

export default Footer