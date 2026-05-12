import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { ProtectedRoute } from './ProtectedRoute'

function renderRoute(initialEntry = '/home') {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path="/login" element={<div>Login page</div>} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <div>Protected content</div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </MemoryRouter>,
  )
}

beforeEach(() => {
  useAuthStore.setState({ status: 'unauthenticated', token: null, user: null })
})

it('redirects to /login when unauthenticated', () => {
  renderRoute()
  expect(screen.getByText('Login page')).toBeInTheDocument()
})

it('renders children when authenticated', () => {
  useAuthStore.setState({ status: 'authenticated', token: 'tok', user: null })
  renderRoute()
  expect(screen.getByText('Protected content')).toBeInTheDocument()
})
