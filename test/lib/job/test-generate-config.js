'use strict'

/* jshint expr: true */

const chai = require( 'chai' )
const should = chai.should()
const expect = chai.expect
const _ = require( 'lodash' )

const GenerateConfig = require( 'job/generate-config' )

// Dummy config data
const dummyConfigData = {
  a : 1,
  b : {
    b: 2,
    c: 3
  }
}

// Dummy config definition
const dummyConfigDefinition = [
  {source: 'a', destination: 'dest.a'},
  {source: 'b.b', destination: 'dest.b'},
  {source: 'b.c', destination: 'dest.c'},
]

describe( 'GenerateConfig', function describeGenerateConfig() {
  describe('#applyConfig', function testApplyConfig() {
    it('should return an object of config keys when I give it a definition', () => {
      let result = GenerateConfig.applyConfig( dummyConfigData, dummyConfigDefinition )
      expect(result).to.not.be.undefined
      result.should.have.ownProperty('dest')
      result.dest.should.be.a('object')
        .and.deep.equal({
          a:1,
          b:2,
          c:3
        })
    })
    
    it('should predictably handle items in the definition which is not in the data', () => {
      let customDefinition = _.cloneDeep( dummyConfigDefinition )
      customDefinition.push( {source:'missing', destination: 'dest.missing'} )

      let result = GenerateConfig.applyConfig( dummyConfigData, customDefinition )
      expect(result).to.not.be.undefined
      result.should.have.ownProperty('dest')
      result.dest.should.be.a('object')
        .and.deep.equal({
          a:1,
          b:2,
          c:3,
          missing:undefined
        })
    })
    
    it('should predictably handle items in the data which is not in the definition', () => {
      let customData = _.cloneDeep( dummyConfigData )
      customData.missing = 'missing'

      let result = GenerateConfig.applyConfig( customData, dummyConfigDefinition )
      expect(result).to.not.be.undefined
      result.should.have.ownProperty('dest')
      result.dest.should.be.a('object')
        .and.deep.equal({
          a:1,
          b:2,
          c:3
        })
    })

  })
})
