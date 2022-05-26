import type { NextApiRequest, NextApiResponse } from 'next'

const Subscribe = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body

  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  const response: Response = await fetch(
    'https://www.getrevue.co/api/v2/subscribers',
    {
      method: 'POST',
      headers: {
        Authorization: `Token ${process.env.REVUE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        double_opt_in: false
      })
    }
  )

  const data = await response.json()

  if (!response.ok) {
    return res.status(500).json({ error: data.error.email[0] })
  }

  return res.status(201).json({ error: '' })
}

export default Subscribe
