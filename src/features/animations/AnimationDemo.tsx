import { motion } from 'framer-motion'

const demos = [
  {
    label: 'Fade Up',
    variants: { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 } },
  },
  {
    label: 'Scale In',
    variants: { initial: { opacity: 0, scale: 0.6 }, whileInView: { opacity: 1, scale: 1 } },
  },
  {
    label: 'Slide Left',
    variants: { initial: { opacity: 0, x: 120 }, whileInView: { opacity: 1, x: 0 } },
  },
  {
    label: 'Slide Right',
    variants: { initial: { opacity: 0, x: -120 }, whileInView: { opacity: 1, x: 0 } },
  },
  {
    label: 'Rotate',
    variants: { initial: { opacity: 0, rotate: -20, scale: 0.8 }, whileInView: { opacity: 1, rotate: 0, scale: 1 } },
  },
  {
    label: 'Blur In',
    variants: { initial: { opacity: 0, filter: 'blur(8px)' }, whileInView: { opacity: 1, filter: 'blur(0px)' } },
  },
]

export function AnimationDemo() {
  return (
    <section id="animations" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center text-neutral-900 dark:text-neutral-100">
          Animation Demos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {demos.map(({ label, variants }) => (
            <motion.div
              key={label}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: false, margin: '-40px' }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              variants={variants}
              className="h-40 rounded-xl bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white font-semibold text-lg shadow-lg"
            >
              {label}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
