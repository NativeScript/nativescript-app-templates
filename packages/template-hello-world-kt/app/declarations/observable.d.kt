@file:JsModule("tns-core-modules/data/observable")

external class Observable {
    fun <T> set(name: String, value: T)
    fun <T> get(name: String): T
}