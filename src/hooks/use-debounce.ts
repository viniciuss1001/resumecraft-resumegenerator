import { useEffect, useState } from "react"

export const useDebounce = <T>(value: T, delay?: number): T => {
    const [debounceValues, setDebounceValues] = useState<T>(value)

    useEffect(() => {
        const timer = setTimeout(() => setDebounceValues(value), delay || 500)

        return () => clearTimeout(timer)

    }, [delay, value])

    return debounceValues
}