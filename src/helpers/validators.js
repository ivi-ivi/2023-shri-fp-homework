/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */
import {allPass, anyPass, compose, count, equals, filter, length, pipe} from "ramda";

// common functions
const isColorGreen = (color) => color === 'green'
const isColorRed = (color) => color === 'red'
const isColorBlue = (color) => color === 'blue'
const isColorOrange = (color) => color === 'orange'

const isColorNotWhite = (color) => color !== 'white'
const isColorNotRed = (color) => color !== 'red'

const toColorArr = (props) => Object.values(props)

const getStar = ({star}) => star
const getCircle = ({circle}) => circle
const getSquare = ({square}) => square
const getTriangle = ({triangle}) => triangle

const colorGreenNum = count(isColorGreen)
const colorRedNum = count(isColorRed)

const isStarRed = compose(
    isColorRed, getStar
)
const isSquareOrange = pipe(
    getSquare, isColorOrange
)
const isSquareGreen = compose(
    isColorGreen, getSquare
)
const isTriangleGreen = compose(
    isColorGreen, getTriangle
)

const equal = (a, b) => (props) => a(props) === b(props);

// 1. Красная звезда, зеленый квадрат, все остальные белые.
const isColorWhite = (color) => color === 'white'

const isCircleWhite = compose(
    isColorWhite, getCircle
)
const isTriangleWhite = compose(
    isColorWhite, getTriangle
)

export const validateFieldN1 = allPass(
    [isStarRed, isSquareGreen, isCircleWhite, isTriangleWhite]
)

// 2. Как минимум две фигуры зеленые.
const isTwoOrMoreGreen = (num) => num >= 2
export const validateFieldN2 = compose(
    isTwoOrMoreGreen, length, filter(isColorGreen), toColorArr,
);

// 3. Количество красных фигур равно кол-ву синих.
const numOfRed = compose(length, filter(isColorRed), toColorArr)
const numOfBlue = compose(length, filter(isColorBlue), toColorArr)
export const validateFieldN3 = equal(
    numOfBlue, numOfRed
)

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
const isCircleBlue = pipe(
    getCircle, isColorBlue
)
export const validateFieldN4 = allPass(
    [isCircleBlue, isStarRed, isSquareOrange]
)

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
const isTheeOrMore = (num) => num >= 3
const isTheeOrMoreBlue = compose(isTheeOrMore, length, filter(isColorBlue), toColorArr)
const isTheeOrMoreGreen = compose(isTheeOrMore, length, filter(isColorGreen), toColorArr)
const isTheeOrMoreRed = compose(isTheeOrMore, length, filter(isColorRed), toColorArr)
const isTheeOrMoreOrange = compose(isTheeOrMore, length, filter(isColorOrange), toColorArr)
export const validateFieldN5 = anyPass(
    [isTheeOrMoreBlue, isTheeOrMoreRed, isTheeOrMoreOrange, isTheeOrMoreGreen]
)

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
const isTwoGreen = pipe(toColorArr, colorGreenNum, equals(2));
const isOneRed = pipe(toColorArr, colorRedNum, equals(1));
export const validateFieldN6 = allPass(
    [isTriangleGreen, isTwoGreen, isOneRed]
)

// 7. Все фигуры оранжевые.
const isStarOrange = pipe(
    getStar, isColorOrange
)
const isTriangleOrange = pipe(
    getTriangle, isColorOrange
)
const isCircleOrange = pipe(
    getCircle, isColorOrange
)
export const validateFieldN7 = allPass([
    isSquareOrange, isStarOrange, isCircleOrange, isTriangleOrange
])

// 8. Не красная и не белая звезда, остальные – любого цвета.
const isColorNotWhiteOrRed = allPass([isColorNotRed, isColorNotWhite])
export const validateFieldN8 = pipe(
    getStar, isColorNotWhiteOrRed
)

// 9. Все фигуры зеленые.
const isStarGreen = compose(
    isColorGreen, getStar
)
const isCircleGreen = compose(
    isColorGreen, getCircle
)
export const validateFieldN9 = allPass([
    isStarGreen, isSquareGreen, isTriangleGreen, isCircleGreen
])

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
const getColor = (color) => color
const triangleColor = pipe(getTriangle, getColor)
const squareColor = pipe(getSquare, getColor)
export const validateFieldN10 = equal(triangleColor, squareColor)
