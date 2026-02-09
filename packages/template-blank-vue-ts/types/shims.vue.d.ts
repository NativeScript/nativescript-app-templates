declare module '*.vue' {
  import { DefineComponent } from 'nativescript-vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
