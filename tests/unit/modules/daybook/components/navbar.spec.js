import { shallowMount } from "@vue/test-utils"

import Navbar from '@/modules/daybook/components/NavbarItem'
import createVuexStore from '../../../mock-data/mock-store'


describe('Pruebas en el Navbar component', () => { 


    const store = createVuexStore({
        user: {
            name: 'Breyner Santiago',
            email: 'breyner@gmail.com'
        },
        status: 'authenticated',
        idToken: 'ABC',
        refreshToken: 'XYZ'
    })

    beforeEach(() => jest.clearAllMocks() )
    
    test('debe de mostrar el componente correctamente', () => { 
        

        const wrapper = shallowMount( Navbar, {
            global: {
                plugins: [ store ]
            }
        })

        expect( wrapper.html() ).toMatchSnapshot()

     })

     test('click en logout, debe de cerrar la seccion y redirrecionar', async() => { 
        
        const wrapper = shallowMount( Navbar, {
            global: {
                plugins: [ store ]
            }
        })

        await wrapper.find('button').trigger('click')

        expect( wrapper.router.push ).toHaveBeenCalledWith({ name: "login" })

        expect( store.state.auth ).toEqual({
            user: null,
            status: 'not-authenticated',
            idToken: null,
            refreshToken: null
        })


      })


 })