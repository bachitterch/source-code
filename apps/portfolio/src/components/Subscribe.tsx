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
    <div className='rounded-xl bg-white-10 p-6'>
      <h2 className='mb-2'>Subscribe to the newsletter</h2>
      <p>
        Be notified when I publish new posts, any new project is in release or
        emails about web development and more!
      </p>
      <form className='my-2 flex items-center gap-4' onSubmit={subscribe}>
        <input
          ref={inputEl}
          type='email'
          className='w-full rounded-md border-0 bg-white-0/30 px-4 py-2 transition-all duration-300 ease-in-out focus:ring-2 focus:ring-white-500/50'
          placeholder='email@hey.com'
          autoComplete='email'
          required
        />
        <button
          type='submit'
          className='flex h-10 items-center justify-center rounded-md bg-white-200/30 px-3 transition-all duration-300 ease-in-out hover:bg-white-200/70'
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
