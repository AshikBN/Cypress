'use client'
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { AuthUser } from '@supabase/supabase-js'
import EmojiPicker from '../global/emoji-picker'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { CreateWorkspaceFormSchema } from '@/lib/types'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Subscription } from '@/lib/supabase/supabase.types'
import Loader from '../global/loader'
import { Button } from '../ui/button'


interface DashboardSetupProps{
  user:AuthUser,
  subscription: Subscription
}

const DashboardSetup:React.FC<DashboardSetupProps> = ({user,subscription}) => {

  const [selectedEmoji,setSelectedEmoji]=useState('🗂️')

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting: isLoading, errors },
  } = useForm<z.infer<typeof CreateWorkspaceFormSchema>>({
    mode: 'onChange',
    defaultValues: {
      logo: '',
      workspaceName: '',
    },
  });


  return (
    <Card className='w-[800px]
    h-screen sm:h-auto
    '>
      <CardHeader>
        <CardTitle>
          Create A Workspace
        </CardTitle>
        <CardDescription>
          Lets create a private workspace to get you started. You can 
          add collaborators from the workspace settings later.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={()=>{}}>
          <div className=' flex flex-col gap-4'>
            <div className='flex items-center gap-4'>
              <div className='text-5xl'>
                <EmojiPicker getValue={(emoji)=>setSelectedEmoji(emoji)} >{selectedEmoji}</EmojiPicker>
              </div>
              <div className='w-full'>
                <Label htmlFor='workspaceName' className='text-sm text-muted-foreground'>
                  Name
                </Label>
                <Input  id='workspaceName ' type='text' placeholder='Workspace Name' disabled={isLoading}
                {...register('workspaceName',{required:'Workspace name is required'})}
                />
                <small className='text-red-600'>
                  {errors?.workspaceName?.message?.toString()}
                </small>
                
              </div>
            </div>
            <div>
              <Label htmlFor='logo' className='text-sm text-muted-foreground'>
                Workspace Logo
              </Label>
              <Input className='cursor-pointer'  id='logo' type='file' accept='image/*' placeholder='Workspace Logo' 
              {...register('logo',{required:false})}
              />
              <small className='text-red-600'>
                {errors?.logo?.message?.toString()}
              </small>
              {
                subscription?.status !=='active' && (
                  <small
                    className="
                      text-muted-foreground
                      block
                      "
                    >
                      To customize your workspace, you need to be on a Pro Plan
                    </small>
                )
              }
            </div>
            <div className='self-end'>
              <Button className='curson-pointer' disabled={isLoading} type='submit' >
                {
                  !isLoading?'Create Workspace':<Loader/>
                }
              </Button>
            </div>

          </div>

        </form>
      </CardContent>

    </Card>
  )
}

export default DashboardSetup
