
const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-neutral-100">
      <output className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-neutral-500 border-r-transparent"></output>
    </div>
  )
}

export default Loading