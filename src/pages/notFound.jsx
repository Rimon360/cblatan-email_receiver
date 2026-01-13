const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-100">
    <h1 className="text-7xl font-extrabold mb-4 text-white">404</h1>
    <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
    <p className="mb-6 text-gray-400">Sorry, the page you are looking for does not exist.</p>
    <a href="/" className="px-6 py-2 rounded bg-white font-medium transition">
      Go Home
    </a>
  </div>
)

export default NotFound
