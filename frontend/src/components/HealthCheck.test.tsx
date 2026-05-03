import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import HealthCheck from './HealthCheck'

const mockGet = vi.fn()

vi.mock('../api/client', () => ({
  default: {
    get: (...args: unknown[]) => mockGet(...args),
  },
}))

describe('HealthCheck', () => {
  beforeEach(() => {
    mockGet.mockReset()
  })

  it('displays backend status when health check succeeds', async () => {
    mockGet.mockResolvedValueOnce({
      data: { status: 'healthy', message: 'Backend is responding' },
    })

    render(<HealthCheck />)

    expect(screen.getByRole('heading', { name: /backend health check/i })).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText(/healthy/i)).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(screen.getByText(/backend is responding/i)).toBeInTheDocument()
    })
  })

  it('shows an error when the health endpoint fails', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    mockGet.mockRejectedValueOnce(new Error('network'))

    render(<HealthCheck />)

    await waitFor(() => {
      expect(screen.getByText(/failed to connect to backend/i)).toBeInTheDocument()
    })

    consoleSpy.mockRestore()
  })
})
