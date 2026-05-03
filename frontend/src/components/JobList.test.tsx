import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import JobList from './JobList'

const mockGet = vi.fn()

vi.mock('../api/client', () => ({
  default: {
    get: (...args: unknown[]) => mockGet(...args),
  },
}))

const listingProps = {
  currentUser: null,
  onRequireAuth: vi.fn(),
  searchTerm: '',
  locationFilter: '',
  jobTypeFilter: '',
  experienceFilter: '',
  salaryFilter: '',
}

describe('JobList (Discover Jobs)', () => {
  beforeEach(() => {
    mockGet.mockReset()
  })

  it('renders the Discover header and loads job listings from the API', async () => {
    mockGet.mockResolvedValue({
      data: [
        {
          id: 1,
          job_title: 'Software Engineer Intern',
          company: 'Acme Corp',
          location: 'Remote',
          experience_level: 'Entry',
          job_type: 'Full-time',
          description: 'Build features with React and Django.',
          apply_url: 'https://example.com/apply',
          salary: '$50/hour',
          show_in_discover: true,
        },
      ],
    })

    render(<JobList {...listingProps} />)

    expect(screen.getByRole('heading', { name: /discover jobs/i })).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.getByText('Software Engineer Intern')).toBeInTheDocument()
    })
    expect(screen.getByText('Acme Corp')).toBeInTheDocument()
    expect(mockGet).toHaveBeenCalled()
  })

  it('shows an empty-state message when the API returns no jobs', async () => {
    mockGet.mockResolvedValue({ data: [] })

    render(<JobList {...listingProps} />)

    await waitFor(() => {
      expect(screen.getByText(/no jobs available/i)).toBeInTheDocument()
    })
  })
})
