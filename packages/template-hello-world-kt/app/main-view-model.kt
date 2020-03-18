fun createViewModel() = Observable().apply {
    // initialize observable's properties:
    
    val initialCounterValue = 42

    set("counter", initialCounterValue)
    set("message", getMessage(initialCounterValue))

    set("onTap") { 
        val currentCounterValue = get<Int>("counter")
        val newCounterValue = currentCounterValue - 1

        set("counter", newCounterValue)
        set("message", getMessage(newCounterValue))
    }
}

private fun getMessage(counter: Int) = 
    if (counter <= 0) "Hoorraaay! You unlocked the NativeScript clicker achievement!" 
    else "${counter} taps left"