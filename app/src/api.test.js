import { getMediaUrl } from './api'

test('uses frontend public assets for local image paths', () => {
    expect(
        getMediaUrl('D:\\guviProj1\\frontend\\app\\public\\images\\earbuds.png')
    ).toBe('/images/earbuds.png')
})

test('removes Django collision suffixes to match bundled images', () => {
    expect(getMediaUrl('/images/earbuds_YZHbIW8.png')).toBe('/images/earbuds.png')
})

test('preserves externally hosted image URLs', () => {
    expect(getMediaUrl('https://cdn.example.com/image.png')).toBe(
        'https://cdn.example.com/image.png'
    )
})
