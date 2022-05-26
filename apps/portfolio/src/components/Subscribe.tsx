import { useRef, useState } from 'react'
import { Form, FormState } from '@lib/types'

export const Subscribe = () => {
  const inputEl = useRef(null)
  const [form, setForm] = useState<FormState>({ state: Form.Initial })

  const subscribe = async e => {
    e.preventDefault()

    setForm({ state: Form.Loading })

    const res = await fetch('/api/subscribe', {
      body: JSON.stringify({ email: inputEl.current.value }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })

    const { error } = await res.json()

    if (error) {
      setForm({
        state: Form.Error,
        message: error
      })
      return
    }

    inputEl.current.value = ''

    setForm({
      state: Form.Success,
      message: `Success! 🎉 You've been added to the list! 🎉`
    })
  }

  return (
    <div className='bg-white-10 rounded-xl p-6'>
      <h2 className='mb-2'>Subscribe to the newsletter</h2>
      <p>
        Be notified when I publish new posts, any new project is in release or
        emails about web development and more!
      </p>
      <form className='my-2 flex items-center gap-4' onSubmit={subscribe}>
        <input
          ref={inputEl}
          type='email'
          className='bg-white-0/30 focus:ring-white-500/50 w-full rounded-md border-0 px-4 py-2 transition-all duration-300 ease-in-out focus:ring-2'
          placeholder='email@hey.com'
          autoComplete='email'
          required
        />
        <button
          type='submit'
          className='bg-white-200/30 hover:bg-white-200/70 flex h-10 items-center justify-center rounded-md px-3 transition-all duration-300 ease-in-out'
        >
          {form.state === Form.Loading ? <span>loading...</span> : 'Subscribe'}
        </button>
      </form>
      {form.state === Form.Error ? (
        <p>{form.message}</p>
      ) : form.state === Form.Success ? (
        <p>{form.message}</p>
      ) : (
        <p className='text-sm'>No spam - unsubscribe at any time!</p>
      )}
    </div>
  )
}

export default Subscribe
