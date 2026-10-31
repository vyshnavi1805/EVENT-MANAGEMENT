export default function Navbar({ user, authLoading, onLogin, onLogout }) {
  const showUser = !!user

  const displayName = user?.displayName || user?.email || 'User'
  const avatarLetter = displayName.trim().slice(0, 1).toUpperCase()

  return (
    <header className="navbar">
      <div
        className="logo"
        onClick={() => {
          const el = document.getElementById('hero')
          el?.scrollIntoView({ behavior: 'smooth' })
        }}
        role="button"
        tabIndex={0}
      >
        Ev<span>neto</span>
      </div>

      <nav>
        <ul>
          <li>
            <a href="#hero">Home</a>
          </li>
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#gallery">Gallery</a>
          </li>
          <li>
            <a href="#price">Price</a>
          </li>
          <li>
            <a href="#review">Review</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>

          {!authLoading && !showUser ? (
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  onLogin?.()
                }}
              >
                Login
              </a>
            </li>
          ) : null}

          {showUser ? (
            <>
              <li>
                <a
                  href="#"
                  className="nav-user"
                  onClick={(e) => e.preventDefault()}
                  aria-label="Logged in user"
                >
                  <span className="nav-avatar">
                    {user?.photoURL ? (
                      <img src={user.photoURL} alt="" />
                    ) : (
                      avatarLetter
                    )}
                  </span>
                  <span>{displayName}</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    onLogout?.()
                  }}
                >
                  Logout
                </a>
              </li>
            </>
          ) : null}
        </ul>
      </nav>
    </header>
  )
}

