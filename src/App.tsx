import React from 'react'

class App extends React.Component {
  render() {
    return (
      <div className="min-h-full">
        <nav className="bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <a href="/home">
                    <img className="h-8 w-8" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav >

        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">OpenPasswd</h1>
          </div>
        </header>
        <main className="min-w-full min-h-full">
          <div className="text-center">
            <div className="px-4 py-6 text-3xl font-bold text-gray-900">
              Oops!
            </div>
            <div className="px-4 py-6 text-3xl font-bold text-gray-900">
              Under construction!
            </div>
          </div>
        </main>

        <footer className="absolute bottom-0 left-0 min-w-full text-center lg:text-left bg-gray-100 text-gray-600">
          <div className="text-center p-6 bg-gray-200">
            <span>© 2022 Copyright:</span>
            <a className="text-gray-600 font-semibold" href="https://www.openpasswd.com/">OpenPasswd</a>
          </div>
        </footer>
      </div >

    );
  }
}

export default App;
