import { useRoute } from 'solid-navigation'

export default function Home() {
  const route = useRoute()
  const message = 'SolidJS App'

  return (
    <>
      <actionbar title={route.name} />
      <gridlayout>
        <label
          text={message}
          class="text-center text-2xl font-bold"
        />
      </gridlayout>
    </>
  )
}
