export const Text = ({ text }) => {
  if (!text) {
    return null
  }
  return text.map((value, index) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text
    } = value
    return (
      <span
        key={index}
        className={[
          bold ? 'font-bold' : null,
          italic ? 'italic' : null,
          code
            ? 'bg-white-10 rounded-md py-1 px-2 font-mono text-sm tracking-wider'
            : null,
          strikethrough ? 'line-through' : null,
          underline ? 'underline' : null
        ].join(' ')}
        style={color !== 'default' ? { color } : {}}
      >
        {text.link ? (
          <a className='link' href={text.link.url}>
            {text.content}
          </a>
        ) : (
          text.content
        )}
      </span>
    )
  })
}

export const renderBlocks = block => {
  const { type, id } = block
  const value = block[type]
  if (!value) return null

  switch (type) {
    case 'paragraph':
      return (
        <p>
          <Text text={value.rich_text} />
        </p>
      )
    case 'heading_1':
      return (
        <h1>
          <Text text={value.rich_text} />
        </h1>
      )
    case 'heading_2':
      return (
        <h2 className='!mt-12'>
          <Text text={value.rich_text} />
        </h2>
      )
    case 'heading_3':
      return (
        <h3 className='!mt-8'>
          <Text text={value.rich_text} />
        </h3>
      )
    case 'numbered_list_item':
      return (
        <li className='list-decimal'>
          <Text text={value.rich_text} />
        </li>
      )
    case 'bulleted_list_item':
      return (
        <li>
          <Text text={value.rich_text} />
        </li>
      )
    case 'to_do':
      return (
        <div>
          <label className='to-do flex items-center gap-2' htmlFor={id}>
            <input
              type='checkbox'
              className='hover:ring-white-600  checked:ring-white-300 text-white-300  rounded-md hover:ring focus:outline-0 focus:ring-0 active:ring-0'
              id={id}
              aria-describedby={value.rich_text}
              defaultChecked={value.checked}
            />{' '}
            <Text text={value.rich_text} />
          </label>
        </div>
      )
    case 'child_page':
      return <p>{value.title}</p>
    case 'image': {
      const src =
        value.type === 'external' ? value.external.url : value.file.url
      const caption = value.caption ? value.caption[0]?.plain_text : ''
      return (
        <div className='imageContainer'>
          <img
            src={src}
            alt={caption}
            loading='lazy'
            className='postImage h-full max-h-[684px] w-full max-w-[1200px] rounded-xl'
          />
          {caption && (
            <figcaption className='text-tiny ml-px italic opacity-60'>
              {caption}
            </figcaption>
          )}
        </div>
      )
    }
    case 'divider':
      return <hr key={id} />
    case 'quote':
      return (
        <blockquote className='bg-white-10 border-l-4 px-4 py-2' key={id}>
          {value.rich_text[0].plain_text}
        </blockquote>
      )
    case 'callout':
      return (
        <div className='callout bg-white-10 flex items-center gap-3 rounded-md px-4 py-4'>
          {value.icon && <span>{value.icon.emoji}</span>}
          <div>
            <Text text={value.rich_text} />
          </div>
        </div>
      )
    case 'code':
      return (
        <div className='text-primary bg-white-10  relative rounded-2xl'>
          <p className='text-tiny border-b border-b-white px-6 py-3 capitalize opacity-60'>
            {value.language}
          </p>

          <pre className=' overflow-auto whitespace-pre p-6 leading-8'>
            <code className='flex flex-wrap font-mono' key={id}>
              {value.rich_text[0].plain_text}
            </code>
          </pre>
        </div>
      )
    case 'video':
      return (
        <div className='relative mx-auto h-full w-full overflow-hidden pb-[56.25%]'>
          <iframe
            className='absolute top-0 left-0 mx-auto h-full w-full rounded-md md:rounded-xl'
            src={value.external.url}
            frameBorder='0'
            allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            title='YouTube Video'
          />
        </div>
      )
    case 'embed':
      return (
        <div className='relative mx-auto h-full w-full overflow-hidden pb-[56.25%]'>
          <iframe
            className='absolute top-0 left-0 mx-auto h-full w-full rounded-md md:rounded-xl'
            src={value.url}
            frameBorder='0'
            allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            title='embed'
          />
        </div>
      )
    case 'pdf':
      return (
        <div className='relative mx-auto h-full w-full overflow-hidden pb-[56.25%]'>
          <iframe
            className='absolute top-0 left-0 mx-auto h-full w-full rounded-md md:rounded-xl'
            src={value.file.url}
            frameBorder='0'
            allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            title='embed'
          />
        </div>
      )
    default:
      return `❌ Unsupported block (${
        type === 'unsupported' ? 'unsupported by Notion API' : type
      })`
  }
}
