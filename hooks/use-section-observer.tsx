"use client"

import { useEffect } from "react"

export function useSectionObserver() {
  useEffect(() => {
    const sections = document.querySelectorAll("section")
    const navLinks = document.querySelectorAll("nav a")

    const options = {
      threshold: 0.5,
      rootMargin: "-100px 0px -100px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id")

          // Update navigation links
          navLinks.forEach((link) => {
            link.classList.remove("text-indigo-600", "dark:text-indigo-400")
            link.classList.add("text-gray-700", "dark:text-gray-300")

            const href = link.getAttribute("href")?.substring(1)
            if (href === id) {
              link.classList.remove("text-gray-700", "dark:text-gray-300")
              link.classList.add("text-indigo-600", "dark:text-indigo-400")
            }
          })
        }
      })
    }, options)

    sections.forEach((section) => {
      observer.observe(section)
    })

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section)
      })
    }
  }, [])
}
