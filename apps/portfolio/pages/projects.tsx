import { getItemList, convertProjectsToList } from '@lib/notion'
import Container from '@layouts/__layout'
import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import Image from 'next/image'

const projectsDbId = process.env.PROJECTS_DATABASE_ID

export const getStaticProps: GetStaticProps = async () => {
  const response = await getItemList(projectsDbId)
  const { items } = convertProjectsToList(response)

  return {
    props: {
      projects: items
    },
    revalidate: 600
  }
}

const Projects = ({ projects }) => {
  return (
    <>
      <NextSeo
        title={`Projects - Bachitter Chahal`}
        canonical={`https://bachitter.dev/projects`}
      />
      <Container>
        <h1>Projects</h1>
        <p className='text-tiny mb-10 opacity-60 md:text-base'>
          Thing I have built on the internet.
        </p>
        <div className='projects_list space-y-6'>
          {(!projects.length && (
            <p className='text-white-600 text-center text-base'>
              No Project Found!
            </p>
          )) ||
            projects.map(project => {
              return (
                <div key={project.id}>
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    objectFit='cover'
                    width={1200}
                    height={684}
                    placeholder='blur'
                    blurDataURL={project.thumbnail}
                    className='projectImage rounded-xl'
                  ></Image>
                  <h2 className='text-white-800 mb-2 mt-4'>{project.title}</h2>
                  <p className='mb-4 text-base'>{project.summary}</p>
                  <div className='project-links flex gap-4'>
                    <a
                      target='blank'
                      rel='noopener noreferrer'
                      href={project.link}
                    >
                      Visit Website
                    </a>
                    <a
                      target='blank'
                      rel='noopener noreferrer'
                      href={project.github}
                    >
                      View Code
                    </a>
                  </div>
                </div>
              )
            })}
        </div>
      </Container>
    </>
  )
}

export default Projects
