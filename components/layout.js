import NavBar from './Nav'
// import Footer from './footer'

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
    </>
  )
}