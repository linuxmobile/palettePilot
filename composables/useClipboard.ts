import { useToast } from 'primevue/usetoast'

export function useClipboard() {
  const toast = useToast()

  const copyToClipboard = async (text: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text)
      toast.add({
        severity: 'success',
        summary: 'Copied to Clipboard',
        group: 'bl',
        life: 2000
      })
    } catch (err) {
      console.error('Error copying text:', err)
    }
  }

  return { copyToClipboard }
}
