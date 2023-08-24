import { useToast } from "@/components/ui/use-toast";

const UseErrorHandler = () => {
  const { toast } = useToast()

  const showError = (error: string) => {
    return toast({
      duration: 3000,
      variant: "destructive",
      title: "Error",
      description: error,
    })
  }

  const handleRejection = (error: any) => {
    console.error('error_from_code: ' + error)

    if(typeof error === 'string') {
      showError(error)
    }else if(error.response) {
      showError(error.response.data.message)
    }else {
      if(error.message) {
        showError(error.message)
      }else {
        showError('Something went wrong. our team still try to solve it.')
      }
    }
  }

  return {
    showError,
    handleRejection
  }

}

export default UseErrorHandler