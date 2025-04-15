import BreadCrumpComponent from '@/components/pages/account/BreadCrump-user'
import BuyCreditsComponent from '@/components/pages/dashboard/resume/infos-sidebar/buy-credits/buy-credits'
import NewResumeDialog from '@/components/pages/dashboard/resumes/new-resume-dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { getResumes, getUserCredits } from '@/db/queries'
import { auth } from '@/lib/auth'
import { Coins, DollarSign, LogOut, Mail, Paperclip, Plus, User } from 'lucide-react'
import { signOut } from 'next-auth/react'

const AccountPage = async () => {

	const session = await auth()

	const user = session?.user

	const userName = user?.name as string
	const imageProfile = user?.image as string
	const userEmail = user?.email as string

	const resumeLength = (await getResumes()).length
	const userCredits = await getUserCredits()



	return (
		<div className='m-12 border border-slate-800 rounded-sm p-4 flex flex-col lg:w-[50%] ml-auto mr-auto'>
			<BreadCrumpComponent userName={userName} />
			<div className='p-4 flex flex-col items-center justify-center w-[80%] ml-auto mr-auto'>
				<div className='flex flex-col items-center justify-center gap-2 m-auto'>

					<Avatar className='size-20'>
						<AvatarImage src={imageProfile} />
						<AvatarFallback>
							<User />
						</AvatarFallback>
					</Avatar>
					<h2 className='text-3xl font-semibold font-title p-2 '>{userName}</h2>
					<h3 className='text-xl font-semibold font-title p-2 flex gap-2'>
						<Mail />
						<span>Email: </span>
						{userEmail}
					</h3>

				</div>
			</div>
			<div className='p-2 w-full gap-3 flex flex-col'>
				<h3 className='text-xl font-semibold font-title'>
					Informações Gerais:
				</h3>
				<div className='w-full flex gap-2 p-2 items-center border rounded-sm '>
					<Paperclip />
					Você tem um total de {resumeLength} resumo(s).
				</div>
				<div className='w-full flex gap-2 p-2 items-center justify-between border rounded-sm '>
					<span className='flex gap-2'>
					<Coins />
					Você possui um total de {userCredits} créditos disponíveis.
					</span>

					<BuyCreditsComponent />

				</div>

			</div>
		</div>
	)
}

export default AccountPage