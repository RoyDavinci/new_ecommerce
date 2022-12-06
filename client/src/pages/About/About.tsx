import React from "react";
import { Footer, Header } from "../../components";

export const About = () => {
	return (
		<div>
			<Header />
			<section className='text-gray-600 body-font'>
				<div className='container mx-auto flex px-5 py-24 md:flex-row flex-col items-center'>
					<div className='lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center'>
						<h1 className='title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900'>
							Before they sold out
							<br className='hidden lg:inline-block' />
							readymade gluten
						</h1>
						<p className='mb-8 leading-relaxed'>
							Copper mug try-hard pitchfork pour-over freegan heirloom neutra
							air plant cold-pressed tacos poke beard tote bag. Heirloom echo
							park mlkshk tote bag selvage hot chicken authentic tumeric
							truffaut hexagon try-hard chambray.
						</p>
						<div className='flex justify-center'>
							<button className='inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg'>
								Button
							</button>
							<button className='ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg'>
								Button
							</button>
						</div>
					</div>
					<div className='lg:max-w-lg lg:w-full md:w-1/2 w-5/6'>
						<img
							className='object-cover object-center rounded'
							alt='hero'
							src='https://dummyimage.com/720x600'
						/>
					</div>
				</div>
			</section>
			<section className='text-gray-600 body-font'>
				<div className='container px-5 py-24 mx-auto'>
					<div className='flex flex-col text-center w-full mb-20'>
						<h1 className='sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900'>
							Our Team
						</h1>
						<p className='lg:w-2/3 mx-auto leading-relaxed text-base'>
							Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
							gentrify, subway tile poke farm-to-table. Franzen you probably
							haven't heard of them.
						</p>
					</div>
					<div className='flex flex-wrap -m-2'>
						<div className='p-2 lg:w-1/3 md:w-1/2 w-full'>
							<div className='h-full flex items-center border-gray-200 border p-4 rounded-lg'>
								<img
									alt='team'
									className='w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4'
									src='https://dummyimage.com/80x80'
								/>
								<div className='flex-grow'>
									<h2 className='text-gray-900 title-font font-medium'>
										Holden Caulfield
									</h2>
									<p className='text-gray-500'>UI Designer</p>
								</div>
							</div>
						</div>
						<div className='p-2 lg:w-1/3 md:w-1/2 w-full'>
							<div className='h-full flex items-center border-gray-200 border p-4 rounded-lg'>
								<img
									alt='team'
									className='w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4'
									src='https://dummyimage.com/84x84'
								/>
								<div className='flex-grow'>
									<h2 className='text-gray-900 title-font font-medium'>
										Henry Letham
									</h2>
									<p className='text-gray-500'>CTO</p>
								</div>
							</div>
						</div>
						<div className='p-2 lg:w-1/3 md:w-1/2 w-full'>
							<div className='h-full flex items-center border-gray-200 border p-4 rounded-lg'>
								<img
									alt='team'
									className='w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4'
									src='https://dummyimage.com/88x88'
								/>
								<div className='flex-grow'>
									<h2 className='text-gray-900 title-font font-medium'>
										Oskar Blinde
									</h2>
									<p className='text-gray-500'>Founder</p>
								</div>
							</div>
						</div>
						<div className='p-2 lg:w-1/3 md:w-1/2 w-full'>
							<div className='h-full flex items-center border-gray-200 border p-4 rounded-lg'>
								<img
									alt='team'
									className='w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4'
									src='https://dummyimage.com/90x90'
								/>
								<div className='flex-grow'>
									<h2 className='text-gray-900 title-font font-medium'>
										John Doe
									</h2>
									<p className='text-gray-500'>DevOps</p>
								</div>
							</div>
						</div>
						<div className='p-2 lg:w-1/3 md:w-1/2 w-full'>
							<div className='h-full flex items-center border-gray-200 border p-4 rounded-lg'>
								<img
									alt='team'
									className='w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4'
									src='https://dummyimage.com/94x94'
								/>
								<div className='flex-grow'>
									<h2 className='text-gray-900 title-font font-medium'>
										Martin Eden
									</h2>
									<p className='text-gray-500'>Software Engineer</p>
								</div>
							</div>
						</div>
						<div className='p-2 lg:w-1/3 md:w-1/2 w-full'>
							<div className='h-full flex items-center border-gray-200 border p-4 rounded-lg'>
								<img
									alt='team'
									className='w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4'
									src='https://dummyimage.com/98x98'
								/>
								<div className='flex-grow'>
									<h2 className='text-gray-900 title-font font-medium'>
										Boris Kitua
									</h2>
									<p className='text-gray-500'>UX Researcher</p>
								</div>
							</div>
						</div>
						<div className='p-2 lg:w-1/3 md:w-1/2 w-full'>
							<div className='h-full flex items-center border-gray-200 border p-4 rounded-lg'>
								<img
									alt='team'
									className='w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4'
									src='https://dummyimage.com/100x90'
								/>
								<div className='flex-grow'>
									<h2 className='text-gray-900 title-font font-medium'>
										Atticus Finch
									</h2>
									<p className='text-gray-500'>QA Engineer</p>
								</div>
							</div>
						</div>
						<div className='p-2 lg:w-1/3 md:w-1/2 w-full'>
							<div className='h-full flex items-center border-gray-200 border p-4 rounded-lg'>
								<img
									alt='team'
									className='w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4'
									src='https://dummyimage.com/104x94'
								/>
								<div className='flex-grow'>
									<h2 className='text-gray-900 title-font font-medium'>
										Alper Kamu
									</h2>
									<p className='text-gray-500'>System</p>
								</div>
							</div>
						</div>
						<div className='p-2 lg:w-1/3 md:w-1/2 w-full'>
							<div className='h-full flex items-center border-gray-200 border p-4 rounded-lg'>
								<img
									alt='team'
									className='w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4'
									src='https://dummyimage.com/108x98'
								/>
								<div className='flex-grow'>
									<h2 className='text-gray-900 title-font font-medium'>
										Rodrigo Monchi
									</h2>
									<p className='text-gray-500'>Product Manager</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</div>
	);
};
