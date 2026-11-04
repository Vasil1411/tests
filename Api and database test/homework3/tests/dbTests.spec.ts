import { test, expect } from "@playwright/test";
import { connectToOracleDB } from "../connectionToOracleDB";
import oracledb from "oracledb";

test.describe('Database Tests', () => {
    test("Test 1: Проверка на градове", async () => {
        const query = `
            SELECT CITY_NAME, CITY_ID, COUNTRY_ID
            FROM APP_CITY
            WHERE CITY_NAME IS NOT NULL
            ORDER BY CITY_NAME ASC
        `;
        const result = await connectToOracleDB(query);
        console.log("Cities:", result);
        if (result && Array.isArray(result)) {
            expect(result.length).toBeGreaterThan(0);
            result.forEach((city: any) => {
                expect(city.CITY_NAME).toBeDefined();
                expect(city.CITY_ID).toBeDefined();
                expect(city.COUNTRY_ID).toBeDefined();
                expect(typeof city.CITY_ID).toBe('number');
                expect(typeof city.COUNTRY_ID).toBe('number');
                expect(typeof city.CITY_NAME).toBe('string');
            });
        } else {
            throw new Error("No results returned from database");
        }
    });

    test("Test 2: Проверка на държави", async () => {
        const query = `
            SELECT COUNTRY_ID, COUNTRY_NAME
            FROM APP_COUNTRY
            WHERE COUNTRY_ID > 5
            ORDER BY COUNTRY_NAME DESC
        `;
        const result = await connectToOracleDB(query);
        console.log("Countries:", result);
        if (result && Array.isArray(result)) {
            expect(result.length).toBeGreaterThan(0);
            result.forEach((country: any) => {
                expect(country.COUNTRY_ID).toBeDefined();
                expect(country.COUNTRY_NAME).toBeDefined();
                expect(typeof country.COUNTRY_ID).toBe('number');
                expect(typeof country.COUNTRY_NAME).toBe('string');
            });
        } else {
            throw new Error("No results returned from database");
        }
    });

    test("Test 3: Проверка на шофьори", async () => {
        const query = `
            SELECT DRIVER_ID, FIRST_NAME, LAST_NAME, PHONE
            FROM APP_DRIVER
            WHERE UPPER(FIRST_NAME) LIKE '%A%'
            ORDER BY FIRST_NAME ASC
        `;
        const result = await connectToOracleDB(query);
        console.log("Drivers:", result);
        if (result && Array.isArray(result)) {
            expect(result.length).toBeGreaterThan(0);
            result.forEach((driver: any) => {
                
                expect(driver.DRIVER_ID).toBeDefined();
                expect(driver.FIRST_NAME).toBeDefined();
                expect(driver.LAST_NAME).toBeDefined();
                expect(driver.PHONE).toBeDefined();

                
                expect(typeof driver.DRIVER_ID).toBe('number');
                expect(typeof driver.FIRST_NAME).toBe('string');
                expect(typeof driver.LAST_NAME).toBe('string');
                expect(typeof driver.PHONE).toBe('string');
            });
        } else {
            throw new Error("No results returned from database");
        }
    });

    

    test("Test 4: Проверка на поръчки след 30/11/2023", async () => {
        const query = `
            SELECT ORDER_ID, USER_ID, ORDER_DATE
            FROM APP_ORDER
            WHERE ORDER_DATE > TO_DATE('30/11/2023', 'DD/MM/YYYY')
            ORDER BY ORDER_DATE ASC
        `;
        const result = await connectToOracleDB(query);
        console.log("Recent Orders:", result);
        if (result && Array.isArray(result)) {
            expect(result.length).toBeGreaterThan(0);
            result.forEach((order: any) => {
                
                expect(order.ORDER_ID).toBeDefined();
                expect(order.USER_ID).toBeDefined();
                expect(order.ORDER_DATE).toBeDefined();

                
                expect(typeof order.ORDER_ID).toBe('number');
                expect(typeof order.USER_ID).toBe('number');
                
                
                const orderDate = new Date(order.ORDER_DATE);
                const compareDate = new Date('2023-11-30');
                expect(orderDate.getTime()).toBeGreaterThan(compareDate.getTime());
            });
        } else {
            throw new Error("No results returned from database");
        }
    });
});